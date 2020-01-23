const url = 'http://localhost:8000/mira/'

async function fetchClassModels() {
    const response = await fetch(url);
    return response.json();
}

async function fetchSchema(classModel) {
    const response = await fetch(url + classModel);
    return response.json();
}

async function fetchInstance(classModel, id) {
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            className: classModel,
            id,
        }),
    }

    const response = await fetch(url + 'get', postRequest)
    return response.json();
}

async function fetchInstances(classModel, filter={}, page=0, pageSize=10, orderBy=undefined) {
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            className: classModel,
            filter: filter,
            page: page,
            pageSize: pageSize,
            orderBy: orderBy,
        }),
    }

    const response = await fetch(url + 'getInstances', postRequest);
    return response.json();
}

async function fetchDelete(classModel, id) {
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            className: classModel,
            id: id
        }),
    }
    const response = await fetch(url + 'delete', postRequest);
    return response.json();
}

export { 
    fetchClassModels,
    fetchSchema,
    fetchInstance,
    fetchInstances,
    fetchDelete,
}