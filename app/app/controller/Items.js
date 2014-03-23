Ext.define('MD.controller.Items', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'Items': {
                'setActiveItem':me.setActiveItem
            }
        });
    },
    setActiveItem:function(grid,record){
        MD.activeItemId = record.getData()._id;
    }
});
