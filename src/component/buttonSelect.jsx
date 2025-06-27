import Select from 'react-select';

function ReactSelect({ selectedOption = null, setSelectedOption, option = [] }) {
    const customStyles = {
        container: (base) => ({
            ...base,
            width: '100%',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            
        }),

        control: (provided, state) => ({
            ...provided,
            minHeight: "45px",
        }),
        indicatorSeparator: () => ({ display: "none" }),
    };
    return (
        <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={option}
            styles={customStyles}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "#a9e8e8",
                    primary: "#01AEAD",
                },
            })}

        />
    )
}

export default ReactSelect