export const getFormatedDate = (date) => {
    const day = `${date.$D < 10 ? 0 : ""}${date.$D}/${
        date.$M + 1 < 10 ? 0 : ""
    }${date.$M + 1}/${date.$y}`;
    const time = `${date.$H}h${date.$m < 10 ? 0 : ""}${date.$m}`;

    return `Départ le ${day} à ${time}`;
};
