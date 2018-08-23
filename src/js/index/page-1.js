{
    let view = {
        el: '.page-1',
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.init()
            this.bindEventHub()
            this.loadModule1()
            this.loadModule2()
        },
        bindEventHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName === 'page-1'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        },
        //加载模块1
        loadModule1(){
            let script1 = document.createElement('script')
            script1.src = './js/index/page-1-1.js'
            script1.onload = function(){
                console.log('1 over')
            }
            document.body.appendChild(script1)
        },
        //加载模块2
        loadModule2(){
            let script2 = document.createElement('script')
            script2.src = './js/index/page-1-2.js'
            script2.onload = function(){
                console.log('2 over')
            }
            document.body.appendChild(script2)
        }
    }
    controller.init(view, model)
}