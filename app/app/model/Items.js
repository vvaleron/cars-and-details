Ext.define('MD.model.Items', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id',               type: 'string'},
        {name: 'name',              type: 'string'},
        {name: 'imageUrl',          type: 'string'},
        {name: 'categoryId',        type: 'string'},
        {name: 'subCategoryId',     type: 'string'}
    ]
});