const CONFIG = {
  baseURL:
    import.meta.env.MODE == 'development' ? '/api' : import.meta.env.RENDERER_VUE_APP_API_BASEURL
}

export default CONFIG
