#-----------------------------------------------------------------------------
# OSGi GUI Application Project Tree Template

project(com_plugins_{{pluginname}})

set(PLUGIN_export_directive "com_plugins_{{pluginname}}_Export")

set(PLUGIN_SRCS
    {{pluginname}}WindowActivator.cpp

    ### Concrete window plugin class
    gui/{{pluginname}}WindowWidgetPlugin.cpp
	
    ### ZMQ
    {{pluginname}}ZmqBuilder.cpp
    ${ZMQ_INCLUDE_PATH}/nzmqt/nzmqt.cpp
    ${ZMQ_INCLUDE_PATH}/ZmqDirector.cpp
    ${ZMQ_INCLUDE_PATH}/ZmqObject.cpp
    
    ### User class source
    gui/form.cpp
)

set(PLUGIN_MOC_SRCS
    {{pluginname}}WindowActivator.h
    
    ### Plugin Interfaces
    ${PLUGIN_INTERFACE_PATH}/ICenterWindow.h
    ${PLUGIN_INTERFACE_PATH}/IPluginInfo.h
    ${PLUGIN_INTERFACE_PATH}/ISettingWindow.h
    ${PLUGIN_INTERFACE_PATH}/IWidgetPlugin.h
    
    ### Concrete window plugin class
    gui/{{pluginname}}WindowWidgetPlugin.h
    
    ### ZMQ
    {{pluginname}}ZmqBuilder.h
    ${ZMQ_INCLUDE_PATH}/nzmqt/nzmqt.hpp
    ${ZMQ_INCLUDE_PATH}/ZmqBuilder.h
    ${ZMQ_INCLUDE_PATH}/ZmqDirector.h
    ${ZMQ_INCLUDE_PATH}/ZmqObject.h
    
    ### User class header
    gui/form.h
)

set(PLUGIN_UI_FORMS
    ### User QT UI form
    gui/form.ui
)

set(PLUGIN_UI_RCCS
    ### User resource files (*.qrc)
    
)

INCLUDE_DIRECTORIES(
    ${com_plugins_{{pluginname}}_SOURCE_DIR}/gui
    ${com_plugins_{{pluginname}}_INCLUDE_DIRS}
    ${PLUGIN_INTERFACE_PATH}
    ${ZMQ_INCLUDE_PATH}
)

ctkFunctionGetTargetLibraries(PLUGIN_target_libraries)

ctkMacroBuildPlugin(
    NAME ${PROJECT_NAME}
    EXPORT_DIRECTIVE ${PLUGIN_export_directive}
    SRCS ${PLUGIN_SRCS}
    MOC_SRCS ${PLUGIN_MOC_SRCS}
    UI_FORMS ${PLUGIN_UI_FORMS}
    RESOURCES ${PLUGIN_UI_RCCS}
    TARGET_LIBRARIES ${PLUGIN_target_libraries} ${ZMQ_LIBS}
)
if(CTK_QT_VERSION VERSION_GREATER "4")
    qt5_use_modules(com_plugins_radarMonitor Widgets)
endif()
