#include "{{pluginname}}WindowWidgetPlugin.h"
/* (TODO) Include user mainwondow GUI header */
#include <QTextCodec>
#include "form.h"


{{pluginname}}WindowWidgetPlugin::{{pluginname}}WindowWidgetPlugin(){

    QTextCodec::setCodecForTr(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForLocale(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForCStrings(QTextCodec::codecForName("UTF-8"));
    createWidget();
}

{{pluginname}}WindowWidgetPlugin::~{{pluginname}}WindowWidgetPlugin(){

}

void {{pluginname}}WindowWidgetPlugin::createWidget(){
   
	/**
	* (TODO) Create user mainwindow GUI instance and append to list, e.g.:
	*  				ICenterWindow* formsatsearch = new FormSatSearch();
	*  				m_centerWindowList.append(formsatsearch);
	**/
    ICenterWindow* form = new Form();
    m_centerWindowList.append(form);

}

QList<ICenterWindow*> {{pluginname}}WindowWidgetPlugin::getCenterWindow(){

    return m_centerWindowList;
}

QList<ISettingWindow*> {{pluginname}}WindowWidgetPlugin::getSettingWindow(){

    return m_settingWindowList;
}

QList<IPluginInfo*> {{pluginname}}WindowWidgetPlugin::getPluginInfoWindow(){

    return m_pluginInfoList;
}
