#include "form.h"
#include "ui_form.h"

Form::Form(QWidget *parent) : ui(new Ui::Form)
{
    ui->setupUi(this);
}

Form::~Form()
{
    delete ui;
}

void Form::setTitle(const QString &aTitle)
{
    /* Change to user defined props */
}

QString Form::getTitle() const
{
    /* Change to user defined props */
    return tr("TestForm_1");
}

QString Form::getChineseTitle() const
{
    /* Change to user defined props */
    return tr("测试窗体");
}

void Form::setIconFilename(const QString &aIconFilename)
{
    /* Change to user defined props */
}

QString Form::getIconFilename()
{
    /* Change to user defined props */
    return "./resource/icon/monitor.png";
}

bool Form::isActive()
{
    return true;
}
