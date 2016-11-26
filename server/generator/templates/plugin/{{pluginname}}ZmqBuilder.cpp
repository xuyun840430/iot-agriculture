#include <QDebug>
#include "ZmqObject.h"
#include "{{pluginname}}ZmqBuilder.h"
#include "ZmqManagement.h"
#include "ZmqDirector.h"
/* (TODO) Include user receive polling process header */

/////////////////////////////////////////////////////////////////////////////////
// Singleton Access
/////////////////////////////////////////////////////////////////////////////////
QSharedPointer<{{pluginname}}ZmqBuilder> {{pluginname}}ZmqBuilder::m_p{{pluginname}}ZmqBuilder;
{{pluginname}}ZmqBuilder* {{pluginname}}ZmqBuilder::GetInstance() {

    if(m_p{{pluginname}}ZmqBuilder.isNull()) {
        ZmqDirector m_director{{pluginname}};
        m_p{{pluginname}}ZmqBuilder = QSharedPointer<{{pluginname}}ZmqBuilder>(new {{pluginname}}ZmqBuilder());
        m_director{{pluginname}}.Construct(*(m_p{{pluginname}}ZmqBuilder.data()));
    }
    return m_p{{pluginname}}ZmqBuilder.data();
}

{{pluginname}}ZmqBuilder::{{pluginname}}ZmqBuilder() {
    ZMQContext* context = ZmqManagement::GetInstance()->getZeroMQContext();
    m_pZmqObject = new ZmqObject(context);
}

{{pluginname}}ZmqBuilder::~{{pluginname}}ZmqBuilder() {

}

void {{pluginname}}ZmqBuilder::BuildSender() {
    m_pZmqObject->createSender(ZMQSocket::TYP_PUSH, "inproc://pushpull(ALL2CMW)", "RMD2CMW");
}

void {{pluginname}}ZmqBuilder::BuildReceiver() {
	/**
	* (TODO) Connect zmq to user polling receive process function, e.g.:
	*  		m_pZmqObject->createReceiver(ZMQSocket::TYP_SUB, "inproc://pubsub(CMW2ALL)", "CMW2RMD",
    *                     this, SLOT(processZmqMessage(const QList<QByteArray>&)));
	**/

}

void {{pluginname}}ZmqBuilder::BuildContext() {
    m_pZmqObject->startContext();
}

void {{pluginname}}ZmqBuilder::processZmqMessage(const QList<QByteArray>& msg) {
    qDebug()<<"[{{pluginname}}] received message from ZMQ socket!";

    QByteArray ba = msg.at(1); // Data in 2nd place
	
	/**
	* (TODO) Invoke user polling receive process function, e.g.:
	*  			NetDataProcess::getInstance()->processNetworkData(ba.data(), ba.length(), "CMW2RMD");
	**/
}
