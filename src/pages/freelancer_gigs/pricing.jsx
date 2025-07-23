import React, { useEffect, useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { setGigsDetails } from "../../../redux/slices/gigsDetailSlice"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetSingleGigs, useEditGigs } from "../../../api/client/gigs"

const packageNames = ["basic", "standard", "premium"]
const features = [
  "logoTransparency",
  "vectorFile",
  "printableFile",
  "3Dmockups",
  "sourceFile",
  "stationeryDesigns",
  "socialMediaKit",
]

const defaultExtraServices = [
  { key: "additionalRevision", label: "Additional Revision", type: "detailed" },
  { key: "additionalLogo", label: "Additional Logo", type: "detailed" },
  { key: "logoTransparency", label: "Logo Transparency", type: "checkbox" },
  { key: "vectorFile", label: "Vector File", type: "detailed" },
  { key: "printableFile", label: "Printable File", type: "checkbox" },
  { key: "mockup3D", label: "Mockup 3D", type: "detailed" },
  { key: "sourceFile", label: "Source File", type: "checkbox" },
  { key: "stationeryDesigns", label: "Stationery Designs", type: "checkbox" },
  { key: "socialMediaKit", label: "Social Media Kit", type: "checkbox" },
]

const deliveryOptions = ["1", "3", "5"]
const revisionOptions = ["1", "2", "unlimited"]
const conceptOptions = ["1", "2", "unlimited"]

function packageSchema() {
  return yup.object().shape({
    packageType: yup.string().required("Package type is required"),
    name: yup
      .string()
      .required("Package name is required")
      .min(3, "Package name must be at least 3 characters")
      .max(50, "Package name cannot exceed 50 characters")
      .matches(
        /^[a-zA-Z0-9\s-_]+$/,
        "Package name can only contain letters, numbers, spaces, hyphens, and underscores",
      ),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description cannot exceed 500 characters"),
    deliveryTime: yup
      .string()
      .oneOf(deliveryOptions, "Please select a valid delivery time")
      .required("Delivery time is required"),
    revisions: yup
      .string()
      .oneOf(revisionOptions, "Please select a valid revision option")
      .required("Number of revisions is required"),
    concepts: yup
      .string()
      .oneOf(conceptOptions, "Please select a valid concept option")
      .required("Number of concepts is required"),
    price: yup
      .number()
      .typeError("Price must be a valid number")
      .required("Price is required")
      .min(5, "Minimum price is $5")
      .max(10000, "Maximum price is $10,000")
      .test("decimal-places", "Price can have at most 2 decimal places", (value) => {
        if (value === undefined || value === null) return true
        return /^\d+(\.\d{1,2})?$/.test(value.toString())
      }),
    ...features.reduce((acc, feat) => {
      acc[feat] = yup.boolean().nullable()
      return acc
    }, {}),
  })
}

function buildExtraServicesSchema(services) {
  return yup.object().shape(
    services.reduce((acc, service) => {
      if (service.type === "detailed") {
        acc[service.key] = yup.object({
          enabled: yup.boolean(),
          days: yup
            .string()
            .nullable()
            .when("enabled", {
              is: true,
              then: (schema) => schema.required(`Days are required when ${service.label} is enabled`),
              otherwise: (schema) => schema.nullable(),
            }),
          price: yup
            .mixed()
            .nullable()
            .when("enabled", {
              is: true,
              then: () =>
                yup
                  .number()
                  .typeError("Price must be a valid number")
                  .required(`Price is required when ${service.label} is enabled`)
                  .min(1, "Price must be at least $1")
                  .max(5000, "Price cannot exceed $5,000")
                  .test("decimal-places", "Price can have at most 2 decimal places", (value) => {
                    if (value === undefined || value === null) return true
                    return /^\d+(\.\d{1,2})?$/.test(value.toString())
                  }),
              otherwise: (schema) => schema.nullable(),
            }),
        })
      } else {
        acc[service.key] = yup.object({
          enabled: yup.boolean(),
        })
      }
      return acc
    }, {}),
  )
}

export default function PricingForm() {
  const { id } = useParams()
  const { data: gigsData, isSuccess, isPending, isError } = useGetSingleGigs(id)
  const { editGigs, isPending: editGigIsPending } = useEditGigs(id, 'json')
  const [extraServicesList, setExtraServicesList] = useState(defaultExtraServices)
  const [addingExtra, setAddingExtra] = useState(false)
  const [newLabel, setNewLabel] = useState("")
  const [newType, setNewType] = useState("detailed")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isInitialMount = useRef(true)

  const schema = yup.object().shape({
    packages: yup
      .object()
      .shape({
        basic: packageSchema(),
        standard: packageSchema(),
        premium: packageSchema(),
      })
      .test(
        "price-progression",
        "Premium package should cost more than Standard, and Standard should cost more than Basic",
        function (packages) {
          if (!packages?.basic?.price || !packages?.standard?.price || !packages?.premium?.price) {
            return true
          }
          const basicPrice = Number(packages.basic.price)
          const standardPrice = Number(packages.standard.price)
          const premiumPrice = Number(packages.premium.price)
          if (standardPrice <= basicPrice) {
            return this.createError({
              path: "packages.standard.price",
              message: "Standard package price should be higher than Basic package price",
            })
          }
          if (premiumPrice <= standardPrice) {
            return this.createError({
              path: "packages.premium.price",
              message: "Premium package price should be higher than Standard package price",
            })
          }
          return true
        },
      ),
    extraFastDelivery: yup.object().shape({
      enabled: yup.boolean(),
      basic: yup.object({
        days: yup
          .string()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: (schema) => schema.required("Days are required when Extra Fast Delivery is enabled"),
            otherwise: (schema) => schema.nullable(),
          }),
        price: yup
          .mixed()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: () =>
              yup
                .number()
                .typeError("Price must be a valid number")
                .required("Price is required when Extra Fast Delivery is enabled")
                .min(1, "Price must be at least $1")
                .max(1000, "Price cannot exceed $1,000"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      standard: yup.object({
        days: yup
          .string()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: (schema) => schema.required("Days are required when Extra Fast Delivery is enabled"),
            otherwise: (schema) => schema.nullable(),
          }),
        price: yup
          .mixed()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: () =>
              yup
                .number()
                .typeError("Price must be a valid number")
                .required("Price is required when Extra Fast Delivery is enabled")
                .min(1, "Price must be at least $1")
                .max(1000, "Price cannot exceed $1,000"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      premium: yup.object({
        days: yup
          .string()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: (schema) => schema.required("Days are required when Extra Fast Delivery is enabled"),
            otherwise: (schema) => schema.nullable(),
          }),
        price: yup
          .mixed()
          .nullable()
          .when(["../enabled"], {
            is: true,
            then: () =>
              yup
                .number()
                .typeError("Price must be a valid number")
                .required("Price is required when Extra Fast Delivery is enabled")
                .min(1, "Price must be at least $1")
                .max(1000, "Price cannot exceed $1,000"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
    }),
    extraServices: buildExtraServicesSchema(extraServicesList),
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      packages: {
        basic: {
          packageType: "basic",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
        standard: {
          packageType: "standard",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
        premium: {
          packageType: "premium",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
      },
      extraFastDelivery: {
        enabled: false,
        basic: { days: "", price: "" },
        standard: { days: "", price: "" },
        premium: { days: "", price: "" },
      },
      extraServices: defaultExtraServices.reduce((acc, service) => {
        acc[service.key] = service.type === "detailed" ? { enabled: false, days: "", price: "" } : { enabled: false }
        return acc
      }, {}),
    },
  })

  useEffect(() => {
    console.log("useEffect triggered - isSuccess:", isSuccess, "gigsData:", gigsData)
    if (isSuccess && gigsData && Array.isArray(gigsData) && gigsData.length > 0 && isInitialMount.current) {
      const packagesDetails = gigsData[0].packagesDetails
      console.log("packagesDetails:", packagesDetails)

      const packagesData = {
        basic: {
          packageType: "basic",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
        standard: {
          packageType: "standard",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
        premium: {
          packageType: "premium",
          name: "",
          description: "",
          deliveryTime: "",
          revisions: "",
          concepts: "",
          price: "",
          ...features.reduce((acc, feat) => {
            acc[feat] = false
            return acc
          }, {}),
        },
      }

      packagesDetails.forEach((pkg, index) => {
        console.log(`Processing package ${index + 1}:`, pkg)
        const packageType = pkg.packageType?.toLowerCase()
        if (packageNames.includes(packageType)) {
          packagesData[packageType] = {
            packageType: pkg.packageType || packageType,
            name: pkg.packageName || "",
            description: pkg.packageDescription || "",
            deliveryTime: deliveryOptions.includes(pkg.deliveryTime) ? pkg.deliveryTime : "",
            revisions: revisionOptions.includes(pkg.revisions) ? pkg.revisions : "",
            concepts: revisionOptions.includes(pkg.revisions) ? pkg.revisions : "",
            price: pkg.price ? Number(pkg.price) : "",
            logoTransparency: pkg.logoTransparency === "1",
            vectorFile: pkg.vectorFile === "1",
            printableFile: pkg.printableFile === "1",
            sourceFile: pkg.sourceFile === "1",
            stationeryDesigns: pkg.stationeryDesigns === "1",
            socialMediaKit: pkg.socialMediaKit === "1",
            "3Dmockups": pkg["3Dmockups"] === "1" || false,
          }
        }
      })

      console.log("Mapped packagesData:", packagesData)
      console.log("Form values before reset:", watch("packages"))
      reset(
        {
          packages: packagesData,
          extraFastDelivery: {
            enabled: false,
            basic: { days: "", price: "" },
            standard: { days: "", price: "" },
            premium: { days: "", price: "" },
          },
          extraServices: defaultExtraServices.reduce((acc, service) => {
            acc[service.key] = service.type === "detailed" ? { enabled: false, days: "", price: "" } : { enabled: false }
            return acc
          }, {}),
        },
        { keepDefaultValues: false }
      )
      console.log("Form values after reset:", watch("packages"))
      isInitialMount.current = false
    } else {
      console.log("No valid gigsData or not initial mount:", { isSuccess, gigsData })
    }
  }, [gigsData, isSuccess, reset, watch])

  

  const onSubmit = (data) => {
    // dispatch(setGigsDetails(data));
    console.log("data: ", data)
    if (location.pathname.includes('edit')) {
      editGigs(data)
      navigate(`/freelancer/manage-gigs/description/edit/${id}`)
    } else {
      navigate('/freelancer/manage-gigs/pricing')
    }
  }

  const validateNewService = () => {
    if (!newLabel.trim()) {
      alert("Please enter a valid service name.")
      return false
    }
    if (newLabel.trim().length < 3) {
      alert("Service name must be at least 3 characters long.")
      return false
    }
    if (newLabel.trim().length > 50) {
      alert("Service name cannot exceed 50 characters.")
      return false
    }
    if (!/^[a-zA-Z0-9\s-_]+$/.test(newLabel.trim())) {
      alert("Service name can only contain letters, numbers, spaces, hyphens, and underscores.")
      return false
    }
    const key = newLabel
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/gi, "")
    if (!key) {
      alert("Please enter a valid service name.")
      return false
    }
    if (extraServicesList.find((e) => e.key === key)) {
      alert("This service already exists.")
      return false
    }
    return true
  }

  const startAddingExtra = () => {
    setAddingExtra(true)
    setNewLabel("")
    setNewType("detailed")
  }

  const doneAddingExtra = () => {
    if (!validateNewService()) {
      return
    }
    const key = newLabel
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/gi, "")
    const newService = { key, label: newLabel.trim(), type: newType }
    setExtraServicesList((prev) => [...prev, newService])
    if (newType === "detailed") {
      setValue(`extraServices.${key}`, {
        enabled: false,
        days: "",
        price: "",
      })
    } else {
      setValue(`extraServices.${key}`, {
        enabled: false,
      })
    }
    setAddingExtra(false)
    setNewLabel("")
  }

  const packageFields = [
    {
      label: "Name",
      field: "name",
      type: "text",
      placeholder: "Name Your Package",
    },
    {
      label: "Description",
      field: "description",
      type: "textarea",
      placeholder: "Describe your offering...",
    },
    {
      label: "Delivery Time",
      field: "deliveryTime",
      type: "select",
      options: deliveryOptions,
    },
    {
      label: "Revisions",
      field: "revisions",
      type: "select",
      options: revisionOptions,
    },
    {
      label: "Concepts",
      field: "concepts",
      type: "select",
      options: conceptOptions,
    },
    {
      label: "Price ($)",
      field: "price",
      type: "number",
      placeholder: "$",
    },
  ]

  const getFieldError = (path) => {
    const keys = path.split(".")
    let error = errors
    for (const key of keys) {
      if (error && error[key]) {
        error = error[key]
      } else {
        return null
      }
    }
    return error?.message || null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isPending && <div>Loading...</div>}
      {isError && <div>Error loading gig data. Please try again.</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8 bg-gray-50 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Scope & Pricing</h2>

        {/* Mobile Package Cards */}
        <div className="block lg:hidden space-y-6 mb-10">
          {packageNames.map((pkg) => (
            <div key={pkg} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-gray-100 p-4 rounded-t-lg">
                <h3 className="text-lg font-semibold capitalize text-center">{pkg}</h3>
              </div>
              <div className="p-4 space-y-4">
                {packageFields.map((item) => (
                  <div key={item.field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {item.label}{" "}
                      {["name", "description", "deliveryTime", "revisions", "concepts", "price"].includes(
                        item.field,
                      ) && <span className="text-red-500">*</span>}
                    </label>
                    <Controller
                      name={`packages.${pkg}.${item.field}`}
                      control={control}
                      render={({ field }) => (
                        <>
                          {item.type === "textarea" ? (
                            <textarea
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] ${
                                getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder={item.placeholder}
                              maxLength={500}
                            />
                          ) : item.type === "select" ? (
                            <select
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                              }`}
                            >
                              <option value="">Select</option>
                              {item.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt === "unlimited"
                                    ? "Unlimited"
                                    : `${opt} ${item.label === "Delivery Time" ? "Day(s)" : ""}`}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              {...field}
                              type={item.type}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(item.type === "number" ? Number(e.target.value) || "" : e.target.value)}
                              placeholder={item.placeholder}
                              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                              }`}
                              min={item.type === "number" ? 5 : undefined}
                              max={item.type === "number" ? 10000 : undefined}
                              step={item.type === "number" ? "0.01" : undefined}
                              maxLength={item.field === "name" ? 50 : undefined}
                            />
                          )}
                          {getFieldError(`packages.${pkg}.${item.field}`) && (
                            <p className="text-red-500 text-sm mt-1">
                              {getFieldError(`packages.${pkg}.${item.field}`)}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <Controller
                          name={`packages.${pkg}.${feature}`}
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={field.value ?? false}
                                onChange={(e) => field.onChange(e.target.checked)}
                              />
                              <span className="text-sm text-gray-700 capitalize">
                                {feature.replace(/([A-Z])/g, " $1")}
                              </span>
                            </label>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block overflow-x-auto mb-10">
          <div className="min-w-full">
            <div className="grid grid-cols-4 border border-gray-300">
              <div className="border border-gray-300"></div>
              {packageNames.map((pkg) => (
                <div key={pkg} className="border border-gray-300 bg-gray-100 p-4 text-center font-semibold capitalize">
                  {pkg}
                </div>
              ))}
              {packageFields.map((item) => (
                <React.Fragment key={item.field}>
                  <div className="border border-gray-300 p-4 font-medium bg-gray-50">
                    {item.label}{" "}
                    {["name", "description", "deliveryTime", "revisions", "concepts", "price"].includes(item.field) && (
                      <span className="text-red-500">*</span>
                    )}
                  </div>
                  {packageNames.map((pkg) => (
                    <div key={pkg} className="border border-gray-300 p-3">
                      <Controller
                        name={`packages.${pkg}.${item.field}`}
                        control={control}
                        render={({ field }) => (
                          <>
                            {item.type === "textarea" ? (
                              <textarea
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[60px] ${
                                  getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder={item.placeholder}
                                maxLength={500}
                              />
                            ) : item.type === "select" ? (
                              <select
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                                }`}
                              >
                                <option value="">Select</option>
                                {item.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt === "unlimited"
                                      ? "Unlimited"
                                      : `${opt} ${item.label === "Delivery Time" ? "Day(s)" : ""}`}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                {...field}
                                type={item.type}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(item.type === "number" ? Number(e.target.value) || "" : e.target.value)}
                                placeholder={item.placeholder}
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  getFieldError(`packages.${pkg}.${item.field}`) ? "border-red-500" : "border-gray-300"
                                }`}
                                min={item.type === "number" ? 5 : undefined}
                                max={item.type === "number" ? 10000 : undefined}
                                step={item.type === "number" ? "0.01" : undefined}
                                maxLength={item.field === "name" ? 50 : undefined}
                              />
                            )}
                            {getFieldError(`packages.${pkg}.${item.field}`) && (
                              <p className="text-red-500 text-xs mt-1">
                                {getFieldError(`packages.${pkg}.${item.field}`)}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
              {features.map((feature) => (
                <React.Fragment key={feature}>
                  <div className="border border-gray-300 p-4 font-medium bg-gray-50 capitalize">
                    {feature.replace(/([A-Z])/g, " $1")}
                  </div>
                  {packageNames.map((pkg) => (
                    <div
                      key={`${pkg}.${feature}`}
                      className="border border-gray-300 flex justify-center items-center p-3"
                    >
                      <Controller
                        name={`packages.${pkg}.${feature}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={field.value ?? false}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-lg sm:text-xl font-semibold py-4 mb-4">Add Extra Services</h1>
        <div className="border border-gray-300 bg-white rounded-lg mb-6">
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <Controller
              name="extraFastDelivery.enabled"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span className="text-base sm:text-lg font-semibold">Extra Fast Delivery</span>
                </label>
              )}
            />
          </div>
          {watch("extraFastDelivery.enabled") && (
            <div className="bg-gray-50 p-4 sm:p-6 space-y-4 sm:space-y-6">
              {packageNames.map((pkg) => (
                <div key={pkg} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <h4 className="text-base font-semibold capitalize min-w-[100px]">{pkg}</h4>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="whitespace-nowrap">{"I'll deliver in only"}</span>
                    <Controller
                      name={`extraFastDelivery.${pkg}.days`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <select
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`p-2 border rounded w-full sm:w-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              getFieldError(`extraFastDelivery.${pkg}.days`) ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="unlimited">Unlimited</option>
                          </select>
                          {getFieldError(`extraFastDelivery.${pkg}.days`) && (
                            <p className="text-red-500 text-xs mt-1">
                              {getFieldError(`extraFastDelivery.${pkg}.days`)}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    <span className="whitespace-nowrap">for an extra</span>
                    <Controller
                      name={`extraFastDelivery.${pkg}.price`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <input
                            {...field}
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || "")}
                            placeholder="Price"
                            className={`p-2 border rounded w-full sm:w-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              getFieldError(`extraFastDelivery.${pkg}.price`) ? "border-red-500" : "border-gray-300"
                            }`}
                            min="1"
                            max="1000"
                            step="0.01"
                          />
                          {getFieldError(`extraFastDelivery.${pkg}.price`) && (
                            <p className="text-red-500 text-xs mt-1">
                              {getFieldError(`extraFastDelivery.${pkg}.price`)}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {extraServicesList.map((service) => (
            <div key={service.key} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Controller
                  name={`extraServices.${service.key}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span className="font-semibold">{service.label}</span>
                    </label>
                  )}
                />
                {service.type === "detailed" && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="whitespace-nowrap">for an extra</span>
                    <Controller
                      name={`extraServices.${service.key}.days`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <select
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={`p-2 border rounded w-full sm:w-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              getFieldError(`extraServices.${service.key}.days`) ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="unlimited">Unlimited</option>
                          </select>
                          {getFieldError(`extraServices.${service.key}.days`) && (
                            <p className="text-red-500 text-xs mt-1">
                              {getFieldError(`extraServices.${service.key}.days`)}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    <span className="whitespace-nowrap">and additional</span>
                    <Controller
                      name={`extraServices.${service.key}.price`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <input
                            {...field}
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || "")}
                            placeholder="Price"
                            className={`p-2 border rounded w-full sm:w-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              getFieldError(`extraServices.${service.key}.price`) ? "border-red-500" : "border-gray-300"
                            }`}
                            min="1"
                            max="5000"
                            step="0.01"
                          />
                          {getFieldError(`extraServices.${service.key}.price`) && (
                            <p className="text-red-500 text-xs mt-1">
                              {getFieldError(`extraServices.${service.key}.price`)}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {addingExtra ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Enter custom extra name (3-50 characters)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={50}
                />
                <p className="text-sm text-gray-500 mt-1">{newLabel.length}/50 characters</p>
              </div>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full sm:w-auto p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="detailed">Checkbox + Inputs (with pricing and days)</option>
                <option value="simple">Only Checkbox</option>
              </select>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={doneAddingExtra}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={() => setAddingExtra(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={startAddingExtra}
            className="mb-6 p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
          >
            + Add Extra
          </button>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 order-2 sm:order-1"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || editGigIsPending}
            className="w-full sm:w-auto px-8 py-3 bg-[#01AEAD] text-white rounded-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 order-1 sm:order-2"
          >
            {(isSubmitting || editGigIsPending) ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  )
}