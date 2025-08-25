import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Box, Eye } from "lucide-react";
import { useGetAllProjects } from "../../../api/client/superadmin";

const ActiveProjects = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: projects, isLoading, isError } = useGetAllProjects();

  const handleView = (id) => {
    navigate(`/superadmin/project/${id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter active projects - assuming last 30 days
  const activeProjects = (projects || []).filter((project) => {
    const createdDate = new Date(project.created_at || project.deadline);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  });

  const filteredProjects = activeProjects.filter(
    (project) =>
      project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.category?.toLowerCase().includes(search.toLowerCase()) ||
      project.subCategory?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error fetching active projects</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Active Projects
                  </h1>
                  <p className="text-slate-600 mt-1">
                    View all active freelancer projects
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full sm:w-80 pl-12 pr-4 py-3 border border-slate-300 rounded-xl 
                             bg-white placeholder-slate-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all duration-200
                             shadow-sm hover:shadow-md"
                  placeholder="Search projects by title, category or sub-category..."
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  {filteredProjects.length > 0
                    ? `${filteredProjects.length} active projects found`
                    : "No active projects found"}
                </span>
                <span className="text-slate-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 
                           hover:shadow-md hover:border-blue-200 transition-all duration-300 
                           transform hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 truncate">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mt-1">
                      {project.category} / {project.subCategory}
                    </p>
                    <div
                      className="text-slate-500 text-sm mt-1 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></div>
                    <p className="text-slate-500 text-sm mt-2">
                      <span className="font-medium text-slate-600">Budget:</span>{" "}
                      {project.budget} |{" "}
                      <span className="font-medium text-slate-600">Type:</span>{" "}
                      {project.type} |{" "}
                      <span className="font-medium text-slate-600">Mode:</span>{" "}
                      {project.mode}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 font-medium">Deadline</span>
                      <p className="text-slate-800 font-semibold">
                        {formatDate(project.deadline)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {/* <button
                    onClick={() => handleView(project.id)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 
                               hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 
                               rounded-lg font-medium transition-colors duration-200
                               flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button> */}
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
            <div className="text-center">
              <p className="text-slate-600 mb-6">
                {search
                  ? `No active projects match your search for "${search}"`
                  : "There are no active projects in the system yet"}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg 
                             font-medium transition-colors duration-200"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ActiveProjects);
