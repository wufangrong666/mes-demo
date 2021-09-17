
// 1、用户与权限
const yhyqxAuth = {
    requiresAuth: true,
    index: 2,
    onetype: 'manage',
    twotype: 'yhyqx'
}
const yhyqxRouter = {
    path: 'yhyqx',
    component: () => import('@/views/common/appview'),
    meta: {
        icon: 'seas',
        title: '用户与权限',
        index: 1,
        type: 'manage',
        subType: 'yhyqx'
    },
    children: [
        {
            name: 'yhgl',
            path: 'yhgl',
            component: () => import('@/views/common/appview'),
            meta: {
                title: '用户与部门管理',
                subType: 'yhybmgl',
                ...yhyqxAuth
            }
        },
        {
            name: 'qxgl',
            path: 'qxgl',
            component: () => import('@/views/common/appview'),
            meta: {
                requiresAuth: false,
                title: '角色与权限管理',
                icon: 'department',
                subType: 'jsyqxgl',
                ...yhyqxAuth
            }
        }
    ]
}

// 2、日志管理
const rzglAuth = {
    requiresAuth: true,
    index: 2,
    onetype: 'manage',
    twotype: 'rzgl'
}
const rzglRouter = {
    path: 'rzgl',
    component: () => import('@/views/common/appview'),
    meta: {
        icon: 'seas',
        title: '日志管理',
        requiresAuth: true,
        index: 1,
        type: 'manage',
        subType: 'rzgl'
    },
    hidden: false,
    children: [
        {
            path: 'dlrz',
            component: () => import('@/views/common/appview'),
            meta: {
                title: '登录日志',
                subType: 'dlrz',
                ...rzglAuth
            }
        },
        {
            path: 'qtrz',
            component: () => import('@/views/common/appview'),
            meta: {
                title: '其他日志',
                subType: 'qtrz',
                ...rzglAuth
            }
        }
    ]
}

// 3、企业管理
const qyglAuth = {
    requiresAuth: true,
    index: 2,
    onetype: 'manage',
    twotype: 'qygl'
}
const qyglRouter = {
    path: 'qygl',
    component: () => import('@/views/common/appview'),
    meta: {
        icon: 'seas',
        title: '企业管理',
        requiresAuth: true,
        index: 1,
        type: 'manage',
        subType: 'qygl'
    },
    hidden: false,
    children: [
        {
            path: 'logo',
            //component: () => import('@/views/manage/logo/logoIndex'),
            component: () => import('@/views/common/appview'),
            meta: {
                title: '企业logo',
                subType: 'logo',
                ...qyglAuth
            }
        }
    ]
}


export const childrenMenu = [qyglRouter,yhyqxRouter, rzglRouter]