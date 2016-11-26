#ifndef {{pluginname}}ZMQBUILDER_H
#define {{pluginname}}ZMQBUILDER_H

#include <QSharedPointer>
#include "ZmqBuilder.h"

class ZmqObject;
class {{pluginname}}ZmqBuilder : public ZmqBuilder {

    Q_OBJECT
public:
    {{pluginname}}ZmqBuilder();
    virtual ~{{pluginname}}ZmqBuilder();

    static {{pluginname}}ZmqBuilder* GetInstance();

    void BuildSender();
    void BuildReceiver();
    void BuildContext();
    ZmqObject* GetZmqObject() { return m_pZmqObject; }

public slots:
    void processZmqMessage(const QList<QByteArray>& msg);

private:
    static QSharedPointer<{{pluginname}}ZmqBuilder> m_p{{pluginname}}ZmqBuilder;
    ZmqObject* m_pZmqObject;

};

#endif // {{pluginname}}ZMQBUILDER_H
