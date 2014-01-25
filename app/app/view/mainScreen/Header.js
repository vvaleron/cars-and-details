Ext.define('MD.view.mainScreen.Header', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.headerPanel',

initComponent:function(){
    var me = this;

    Ext.apply(this,{
       title:'Деталі машин',
       cls: 'header',
       width:400,
       height:100,
       collapsible: true,
       collapsed : true,
       listeners:{
           afterrender:function(panel){
               console.log('header panel');
           }
       }
    });
    this.callParent(arguments);
}
});
