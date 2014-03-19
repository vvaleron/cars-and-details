Ext.define('MD.view.Viewport',{
extend:'Ext.container.Viewport',
requires:[
	'MD.view.mainScreen.Wrapper',
	'MD.view.mainScreen.Header',
    'MD.view.mainScreen.CenterPanel',
    'MD.view.mainScreen.SubCategories',
    'MD.view.mainScreen.Items',

    'MD.view.Authorization.LoginForm',

    'MD.view.mainScreen.leftPanel.LeftPanel'
],

initComponent:function(){
    var me = this;

    me.wrapper = Ext.create('MD.view.mainScreen.Wrapper',{}).show();

    Ext.apply(this,{

       layout:'fit',
       fixed:true,

       items:[
        me.wrapper
       ],
       listeners:{
           beforerender:function(viewport){
               console.log('viewport');
           }
       }
    });

    this.callParent(arguments);
}
});