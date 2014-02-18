Ext.define('MD.view.mainScreen.Wrapper', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wrapper',
//    requires:[
//        'MD.view.mainScreen.Header'
//    ],

initComponent:function(){
   var me = this;

    me.headerPanel = Ext.create('MD.view.mainScreen.Header',{
        region: 'north'
    }).show();

    me.centerPanel = Ext.create('MD.view.mainScreen.CenterPanel',{
        region: 'center'
    }).show();

    me.leftPanel = Ext.create('MD.view.mainScreen.leftPanel.LeftPanel',{
        region: 'west'
    }).show();

    Ext.apply(this,{
        cls     : 'wrapper',
        flex    : 1,
        fixed   : true,
        layout  : 'border',
        items: [
            me.headerPanel,
            me.leftPanel,
            {
            region: 'south',
            title: 'South Panel',
            collapsible: true,
            collapsed : true,
            html: 'Information goes here',
            split: true,
            height: 100,
            minHeight: 100
        },{
            region: 'east',
            title: 'East Panel',
            collapsible: true,
            split: true,
            width: 150
        },
            me.centerPanel
        ],
        listeners:{
            beforerender:function(wrapper){
//                console.log('wrapper');
            }
        }
    });
    this.callParent(arguments);
}
});

//{
//    Кузов:
//        {
//            Другое
//            Бамперы
//            Двери
//            Крылья
//            Радиаторные решетки
//            Пороги и арки
//            Подкрылки
//            Капоты
//            Защита
//            Крыша и стойки
//            Крышки багажника
//        }
//},
//{
//    Подвеска, амортизация :
//        {
//            Подвеска, амортизация
//        }
//},
//{
//    Система зажигания :
//        {
//            Система зажигания
//        }
//},
//{
//    Тормозная система :
//        {
//            Тормозная система
//        }
//},
//{
//    Двигатели :
//        {
//              Двигатели
//                Ременный привод
//        }
//},
//{
//    Система подачи топлива :
//        {
//            Система подачи топлива
//        }
//},
//{
//    Аксесуари :
//        {
//              Сидіння
//              дзеркала
//              панель
//              руль
//              педалі
//              подголовніки
//              карти
//              стеклоподйомніки
//              колонки
//              магнітоли
//              дворники
//              Стекла
//              Вентиляция и кондиционирование
//        }
//},
//{
//    Рулевое управление :
//        {
//            Рулевое управление
//        }
//},
//{
//    Система охлаждения :
//        {
//            Система охлаждения
//        }
//},
//{
//    Выхлопная система :
//        {
//            Выхлопная система
//        }
//},
//{
//    Система сцепления :
//        {
//            Система сцепления
//        }
//},
//{
//    Коробка передач :
//        {
//            Коробка передач
//        }
//},
