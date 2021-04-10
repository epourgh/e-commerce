interface Params {
    _id?: number
}

const isEmpty = (obj: Params) => {
    return Object.keys(obj).length === 0;
}

export default isEmpty;