const Http = {
    fetchData: async (conf) => {
        try {
            const response = await fetch(conf.url, {
                method: conf.method,
                headers:  {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${conf.token}`
                },

                body: JSON.stringify(conf.body),
            });

            //conf.token ? headers.Authorization = `Bearer ${conf.token}`: '';

            const responseJson = await response.json();

            if (!response.ok) {
                return { status: false, errors: responseJson.errors };
            }

            return { status: true, data: responseJson };
        } catch (err) {
            return { status: false, error: err.message };
        }
    }
}

export default Http;