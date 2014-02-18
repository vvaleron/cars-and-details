Ext.application({
	name:'MD',
	autoCreateViewport:true,
	models		:[
        'Users',
        'Categories'
    ],
	stores 		:[
        'Users',
        'Categories'
    ],
	controllers	:[
        'MD',
        'Users',
        'Categories'
    ],
	views		: ['Viewport'],
	launch:function(){
		var me = this;
        MD.users = Ext.getStore('Users').user;
    }
});
