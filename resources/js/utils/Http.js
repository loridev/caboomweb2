const Http = {
    fetchData: async (conf) => {
        try {
            const reqObj = {
                method: conf.method,
                headers:  {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${conf.token}`
                },

                body: JSON.stringify(conf.body) || {},
            }

            if (reqObj.method === 'GET') delete reqObj.body;

                const response = await fetch(conf.url, reqObj);

            const responseJson = await response.json();

            if (!response.ok) {
                return { status: false, data: responseJson };
            }

            return { status: true, data: responseJson };
        } catch (err) {
            return { status: false, data: err.message };
        }
    }
}

export default Http;
