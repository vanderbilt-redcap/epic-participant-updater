import API from "./API";

const useAPI = (collection, baseURL='/api') => {
    
    const api = new API(baseURL)

    return {
        list: undefined,
        async getList() {
            if (!this.list) {
                await this.loadList();
            }
            return this.list;
        },
        async loadList() {
            const {data = []} = await this.fetchList();
            this.list = data;
        },
        async fetchList(page = 1, perPage = undefined) {
            const params = {_page: page, _perPage: perPage};
            const response = await api.read(collection, {params});
            const {data, metadata} = response.data;
            return {data, metadata};
        },
        async fetchItem(id) {
            const response = await api.readOne(collection, id);
            return response.data;
        },
        async updateItem(id, data) {
            const response = await api.update(collection, id, data);
            this.loadList(); // update the list upon modification
            return response.data;
        },
        async deleteItem(id) {
            const response = await api.delete(collection, id);
            this.loadList(); // update the list upon modification
            return response.data;
        },
        async createItem(data) {
            const response = await api.create(collection, data);
            this.loadList(); // update the list upon modification
            return response.data;
        }
    };
};

export default useAPI;
