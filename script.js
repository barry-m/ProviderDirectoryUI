const sortByLastName = (x, y) => {
    return x.last_name.toUpperCase() < y.last_name.toUpperCase() ? -1 : 1
}