import React, {useState} from 'react';

const SearchForm = (props) => {
    const [value, setValue] = useState('');
    
    return (
        <form className="search__form">
            <input onChange={q => setValue(q.target.value)} className="search__field" type="search" name="q" placeholder="Search for music…" required/>
            <button onClick={q => setValue("")} className="search__reset" type="reset">Reset</button>
            <button onClick={q => {
                q.preventDefault();
                if (value !== "") {
                    props.search(value);
                  } else {
                    alert('Input value is empty');
                  }
            }} className="search__submit" type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
