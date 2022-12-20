function debounce(func,delay=1000) {
    let timeSet;
    return (...args) => {
        if (timeSet) {
            clearTimeout(timeSet);
        }
        timeSet = setTimeout(() => {
            func.apply(null, args);
        },delay);

    };
}
