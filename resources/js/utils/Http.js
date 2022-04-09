const Http = {
    fetchData: async (conf) => {
        try {
            const response = await fetch(conf.url, {
                method: conf.method,
                headers:  {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${conf.token}`
                },

                body: JSON.stringify(conf.body) || {},
            });

            //conf.token ? headers.Authorization = `Bearer ${conf.token}`: '';

            const responseJson = await response.json();

            console.log(response.status);

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
