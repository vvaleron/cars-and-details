Ext.define('MD.controller.Items', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'Items': {
                'setActiveItem'   : me.setActiveItem,
                'showDetails'     : me.showDetais,
                'hideDetails'     : me.hideDetails
            }
        });
    },

    createDetailsPanel : function(record){
        var id = record.getData()._id;

        Ext.create('Ext.form.Panel', {
            title: false,
            renderTo: "detailsContainer-" + id,
            itemId: "detailsPanel-" + id,
            bodyPadding: "20 10 20 10",
            margin: "0 0 0 0",
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'name',
                    value: record.getData().name
                },
                {
                    xtype: 'displayfield',
                    fieldLabel:'imageUrl',
                    value: record.getData().imageUrl
                },
                {
                    xtype: 'displayfield',
                    fieldLabel:'_id',
                    value: record.getData()._id
                },
                {
                    xtype: 'displayfield',
                    fieldLabel:'categoryId',
                    value: record.getData().categoryId
                },
                {
                    xtype: 'displayfield',
                    fieldLabel:'subCategoryId',
                    value: record.getData().subCategoryId
                }
            ]
        }).show(true);
    },
    setActiveItem: function(grid,record){
        MD.activeItemId = record.getData()._id;
    },

    showDetais : function(record, td){
        var id = record.getData()._id,
            el = document.createElement("div"),
            containerDiv = document.getElementById("detailsContainer-" + id),
            centerTD = Ext.get(td.previousSibling),
            linkText = "change-column-" + id;

        document.getElementById(linkText).innerHTML = "Змінити";

                            if(!containerDiv){
                                el.setAttribute("id","detailsContainer-" + id);
                                el.setAttribute("class","detailsDiv");

                                centerTD.appendChild(el);

                                Ext.get(el).setHeight(300, true);

                                this.createDetailsPanel(record);
                            }else{
                                Ext.get(containerDiv).setHeight(300,true);
                                Ext.get(containerDiv).show(true);
                            }
    },

    hideDetails : function(record){
        var id = record.getData()._id,
            el = Ext.get("detailsContainer-" + id);

        if(el) {
            el.setHeight(0, true);
            el.hide(true);

            document.getElementById("change-column-" + id).innerHTML = "Детально";
        }
    }
});
