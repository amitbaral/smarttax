const parseServiceData = async ({ blocks, subtitle, ...service }) => {
    return ({
        ...service,
        ...blocks
    })
}

export { parseServiceData }