export const handleRemoveGenre = (index: number, setFormData: any) => {
  setFormData((prevData) => {
    const updatedGenres = [...prevData.genres];
    updatedGenres.splice(index, 1);
    return {
      ...prevData,
      genres: updatedGenres,
    };
  });
};
