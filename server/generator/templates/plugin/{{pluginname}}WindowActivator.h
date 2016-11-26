/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/

#ifndef {{pluginname}}WindowActivator_P_H
#define {{pluginname}}WindowActivator_P_H

#include <QScopedPointer>

#include <ctkPluginActivator.h>

class {{pluginname}}WindowWidgetPlugin;
class {{pluginname}}WindowActivator : public QObject, public ctkPluginActivator
{
  Q_OBJECT
  Q_INTERFACES(ctkPluginActivator)

#ifdef HAVE_QT5
  Q_PLUGIN_METADATA(IID "com_plugins_{{pluginname}}")
#endif

public:

  void start(ctkPluginContext* context);
  void stop(ctkPluginContext* context);

private:
  {{pluginname}}WindowWidgetPlugin* m_windowWiget;

};

#endif // {{pluginname}}WindowActivator_P_H
