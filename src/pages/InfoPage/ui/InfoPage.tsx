import {classNames } from '@/shared/lib/classNames/classNames';
import cls from './InfoPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';


const AddPostPage = () => {

    return (
        <Page>
            <div className={classNames(cls.infoPage)}>
                <PageTitle titleArrays={["O сайте"]}/>
                <div className={cls.content}>
                    <Text className={cls.textBlock} 
                        title='Сайт-форум “STIGMATA” создан 
                    специально для студентов СГТУ, чтобы дать им возможность обсуждать различные дисциплины,
                    преподаваемые в нашем вузе,
                    а также делиться опытом и накопленными знаниями друг с другом.'/>
                    <Text className={cls.textBlock}
                        title={`Сайт позволяет просматривать записи контретных разделов, список которых
                    появится при нажатии на кнопку "Панель навигации". 
                    На главной странице находятся 10 последних записей, которые были 
                    добавлены пользователями. Добавление комментариев и записей возможно только
                    зарегистрированному пользователю.
                    Для того, чтобы создать аккаунт вам нужно придумать уникальное имя (username)
                    , добавить фотографию профиля, а также придумать пароль.`}/>
                </div>
            </div>
        </Page>
    );
}

export default AddPostPage;

