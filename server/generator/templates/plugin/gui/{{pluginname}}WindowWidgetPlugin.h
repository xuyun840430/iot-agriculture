#ifndef {{pluginname}}WINDOWWIDGETPLUGIN_H
#define {{pluginname}}WINDOWWIDGETPLUGIN_H

#include <QWidget>
#include "com_plugins_{{pluginname}}_Export.h"
#include "IWidgetPlugin.h"

class com_plugins_{{pluginname}}_Export {{pluginname}}WindowWidgetPlugin: public IWidgetPlugin
{
    Q_OBJECT

public:
    {{pluginname}}WindowWidgetPlugin();
    virtual ~{{pluginname}}WindowWidgetPlugin();

    /* Plugin interfaces */
    QList<ICenterWindow*> getCenterWindow();
    QList<ISettingWindow*> getSettingWindow();
    QList<IPluginInfo*> getPluginInfoWindow();
    
private:
    QList<ICenterWindow*> m_centerWindowList;
    QList<ISettingWindow*> m_settingWindowList;
    QList<IPluginInfo*> m_pluginInfoList;

    void createWidget();
};

#endif // WINDOWWIDGETPLUGIN_H
