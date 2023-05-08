import { useState } from 'react';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";



export function Searchbar({onSubmit}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.warning("Please, enter your query!", {
        theme: "colored"
      });
    }

    onSubmit(searchQuery.trim());
    setSearchQuery("");
  }

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
      <button type="submit" className={css.searchBtn}>
        <MagnifyingGlassIcon />
      </button>
      <input
        className={css.searchInput}
        type="text"
        value={searchQuery}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleSearchChange}
      />
    </form>
  </header>
  )
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
