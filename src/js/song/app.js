{
    let view = {}
    let model = {
        data:{
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        //根据 ID 获取歌曲信息
        get(id){
            var query = new AV.Query('Song')
            return query.get(id).then((song)=>{
                Object.assign(this.data, {id: song.id, ...song.attributes})
                return song
            })
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.get(id).then(()=>{
                console.log(this.model.data)
            })
        },
        //获取歌曲 id
        getSongId(){
            let search = window.location.search
            //过滤字符串中的 ？ 
            if(search.indexOf('?') === 0){
                search = search.substring(1)
            }

            //过滤字符串中的 & 
            let array = search.split('&').filter((v=>v))
            let id = ''
            for(let i=0;i<array.length;i++){
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if(key === 'id'){
                    id = value
                    break
                }
            }
            return id
        }
    }
    controller.init(view, model)
}