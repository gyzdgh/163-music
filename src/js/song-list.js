{
    let view = {
        el: '#songList-container',
        template: `
            <ul class="songList"> 
            </ul>
        `,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)
            let { songs } = data
            let liList = songs.map((song) => $('<li></li>').text(song.name).attr('data-song-id', song.id))
            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
        },
        //激活点击列表
        activeItme(li) {
            let $li = $(li)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        },
        //获取歌曲
        find() {
            var query = new AV.Query('Song');
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    //返回歌曲的每一项
                    return { id: song.id, ...song.attributes }
                })
                return songs
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            this.getAllSongs()
        },
        //获取歌曲列表
        getAllSongs() {
            return this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        //绑定激活列表事件
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                //激活当前点击列表
                this.view.activeItme(e.currentTarget)
                //通过 ID 找到每一项
                let songId = e.currentTarget.getAttribute('data-song-id')
                let data
                let songs = this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id === songId){
                        data = songs[i]
                        break
                    }
                }
                //深拷贝
                window.eventHub.emit('select', JSON.parse(JSON.stringify(data)))
            })
        },
        //绑定命名空间
        bindEventHub() {
            //创建歌曲
            window.eventHub.on('create', (songData) => {
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
            })
            //新建歌曲
            window.eventHub.on('new',()=>{
                this.view.clearActive()
            })
        }
    }
    controller.init(view, model)
}