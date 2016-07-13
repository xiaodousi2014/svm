/**
 * Created by bus.zhang on 2016/7/4.
 */

(function ($) {

    // 配置初始化js、css加载
    $.initOperation = {

        pageInit: function () {
            console.log("初始化plume-pageInit");
            Plume.resource().loadJs(['/js/login.js']);
        },

        indexInit: function () {
            console.log("初始化plume-indexInit");
            Plume.resource().loadJs(['/js/index.js']);
        },

        demoInit: function () {
            console.log("初始化plume-demoInit");
            Plume.resource().loadJs(['/js/demo.js']);
        },

        demo1Init: function () {
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/js/demo1.js']);
        }
    };

})(jQuery);