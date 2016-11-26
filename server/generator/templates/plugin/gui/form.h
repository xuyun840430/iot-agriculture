#ifndef FORM_H
#define FORM_H

#include <QWidget>
#include "ICenterWindow.h"

namespace Ui {
class Form;
}

class Form : public ICenterWindow
{
    Q_OBJECT
    
public:
    explicit Form(QWidget *parent = 0);
    ~Form();

protected:
    //override protected functions of ICenterWindow
    virtual void setTitle(const QString& aTitle);
    virtual QString getTitle() const;
    virtual QString getChineseTitle() const;
    virtual void setIconFilename(const QString& aIconFilename);
    virtual QString getIconFilename();
    virtual bool isActive();
    virtual PluginMenuView* getPluginMenuView() const {}
    
private:
    Ui::Form *ui;
};

#endif // FORM_H
