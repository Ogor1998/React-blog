const Paginate = (items) => {
    const itemsPerPage = 4;
    const numberOfPages = Math.ceil(items.length / itemsPerPage)
    return Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage;
        return items.slice(start, start + itemsPerPage)
    })

}

export default Paginate;