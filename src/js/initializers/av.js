//初始化数据库
var APP_ID = 'OLE1sN9FMRyCmNuMhfxw9wbC-gzGzoHsz';
var APP_KEY = 'usxMwMoSm8tW69MI33NNhWJn';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// var TestObject = AV.Object.extend('Playlist');
// var testObject = new TestObject();
// testObject.save({
//     name: 'test',
//     cover: 'test',
//     creatorId: 'test',
//     description: 'test',
//     songs: ['1', '2']
// }).then(function (object) {
//     alert('LeanCloud Rocks!');
// })