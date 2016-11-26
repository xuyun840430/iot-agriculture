/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/
#include <QDebug>
#include <QtPlugin>
#include <ctkPluginContext.h>

#include "{{pluginname}}WindowActivator.h"
#include "gui/{{pluginname}}WindowWidgetPlugin.h"

//----------------------------------------------------------------------------
void {{pluginname}}WindowActivator::start(ctkPluginContext* context)
{
  m_windowWiget = new {{pluginname}}WindowWidgetPlugin();


  ctkDictionary props;
  props.insert(ctkPluginConstants::SERVICE_RANKING, 0);

  context->registerService(QStringList("IWidgetPlugin"),    // service-> class name: IWidgetPlugin
                           m_windowWiget, props);

  qDebug() << "Registered {{pluginname}}Window UI Plugin";
  qDebug("size=====%d", m_windowWiget->getCenterWindow().size());
  qDebug("title = %s",qPrintable((m_windowWiget->getCenterWindow()).at(0)->getTitle()));
}

//----------------------------------------------------------------------------
void {{pluginname}}WindowActivator::stop(ctkPluginContext* context)
{
  Q_UNUSED(context)
  delete m_windowWiget;
}

#if QT_VERSION < QT_VERSION_CHECK(5,0,0)
  Q_EXPORT_PLUGIN2(com_plugins_{{pluginname}}Window, {{pluginname}}WindowActivator)
#endif
