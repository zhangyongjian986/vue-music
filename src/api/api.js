export default {
  recommend:{//获得推荐页等数据
    url:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    params(){
      return {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        '_': new Date().getTime()
      }
    }
  },
  RadioLyric:{
    url:'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
    params(){
      return {
        nobase64:1,
        musicid:10561,
        songtype:0,
        callback:'jsonp1'
      }
    }
  },
  hotSongs:{
    url:'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    params(id){
      return {
          g_tk:5381,
          uin:0,
          format:'jsonp',
          inCharset:'utf-8',
          outCharset:'utf-8',
          notice:0,
          platform:'h5',
          needNewCode:1,
          new_format:1,
          pic:500,
          disstid:id,
          type:1,
          json:1,
          utf8:1,
          onlysong:0,
          nosign:1
      }
    }
  },
  songLyric:{
    url(id){
      return 'https://api.darlin.me/music/lyric/'+id +'/'
    }
  },
  audioSrc:{
    url(songid) {
      return 'http://ws.stream.qqmusic.qq.com/'+songid+'.m4a?fromtag=46&_='+new Date().getTime()
    }
  },
  topList:{
    url:'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    params(){
      return {
          format: 'jsonp',
          g_tk: 5381,
          uin: 0,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform:'h5',
          needNewCode: 1,
          _: new Date().getTime()
      }
    }
  },
  topListSongs:{//排行榜单的音乐列表
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    params(id){
      return {
          format:'jsonp',
          inCharset:'utf8',
          outCharset:'utf-8',
          notice:0,
          platform:'yqq',
          needNewCode:0,
          topid:id,
          _:new Date().getTime()
      }
    }
  },
  getHotKey:{
    url:'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    params(){
      return {
          g_tk:5381,
          uin:0,
          format:'jsonp',
          inCharset:'utf-8',
          outCharset:'utf-8',
          notice:0,
          platform:'h5',
          needNewCode:1,
          _:new Date().getTime(),
      }
    }
  },
  searchUrl: {
    url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    params(keyword){
      return {
          g_tk:5381,
          uin:0,
          format:'jsonp',
          inCharset:'utf-8',
          outCharset:'utf-8',
          notice:0,
          platform:'h5',
          needNewCode:1,
          w:keyword,
          zhidaqu:1,
          catZhida:1,
          t:0,
          flag:1,
          ie:'utf-8',
          sem:1,
          aggr:0,
          perpage:20,
          n:20,
          p:1,
          remoteplace:'txt.mqq.all',
          _:new Date().getTime()
      }
    }
  }
}
