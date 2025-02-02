'use client';

import AppFooter from "@/components/AppFooter";
import TopMenu from "@/components/menu/TopMenu";
import { ProfileNavigation } from "@/components/profile/ProfileNavigation";
import { useDictionary } from "@/hooks/useDictionary";
import MenuPageLayout from "@/layouts/MenuPageLayout";
import { HomeIcon } from "@/ui/icons/HomeIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { ArticlesIcon } from "@/ui/icons/MyArticlesIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";

const ProfilePage = () => {
    const { translate } = useDictionary(); 

    return (
        <MenuPageLayout
          topMenu={
              <TopMenu 
                  templates={[
                      {
                          text: translate('common.menu.home_page_link'),
                          link: '/',
                          selected: false
                      },
                      {
                          text: translate('common.menu.explore_page_link'),
                          link: '/explore',
                          selected: false
                      },
                      {
                          text: translate('common.menu.about_us_page_link'),
                          link: '/about-us',
                          selected: false
                      },
                      {
                          text: translate('common.menu.categories_page_link'),
                          link: '/categories',
                          selected: false
                      }
                  ]}
              />
            }
            footer={
                <AppFooter
                    sectionTemplates={[
                        {
                            name: translate('common.footer.sections.menu.name'),
                            options: [
                                {
                                    text: translate('common.footer.sections.menu.options.home'),
                                    link: `/`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.explore'),
                                    link: `/explore`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.about_us'),
                                    link: `/about-us/`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.categories'),
                                    link: `/categories/`
                                }
                            ]
                        }
                    ]}
                />
            }
        >
            <div className="relative flex flex-col gap-8 items-start w-full pl-16 pr-16">
                <div className="relative flex flex-row gap-4 w-full">
                    <ProfileNavigation 
                        templates={[
                            {
                                name: 'General',
                                link: '/profile',
                                icon: (
                                    <HomeIcon /> 
                                ),
                                selected: true
                            },
                            {
                                name: 'Liked',
                                link: '/profile/liked',
                                icon: (
                                    <LikeIcon stroked={false} /> 
                                ),
                                selected: false
                            },
                            {
                                name: 'My articles',
                                link: '/profile/my-articles',
                                icon: (
                                    <ArticlesIcon /> 
                                ),
                                selected: false
                            },
                            {
                                name: 'Settings',
                                link: '/profile/settings',
                                icon: (
                                    <SettingsIcon /> 
                                ),
                                selected: false
                            },
                        ]}
                    />
                </div>
            </div>
        </MenuPageLayout>
    );
}

export default ProfilePage;