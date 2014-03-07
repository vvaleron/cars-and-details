Ext.define('MD.model.SubCategories', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id',      type: 'string'},
        {name: 'name',     type: 'string'},
//        {name: 'picture',  type: 'string'},
        {name: 'parent',  type: 'string'}
    ]
});