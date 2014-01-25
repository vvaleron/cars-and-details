Ext.application({
	name:'MD',
	autoCreateViewport:true,
	models		:['Users'],
	stores 		:['Users'],
	controllers	:[
        'MD',
        'Users'
    ],
	views		: ['Viewport'],
	launch:function(){
		window.$_APP = 'MD';
	}
});
