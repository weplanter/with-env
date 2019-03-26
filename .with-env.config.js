module.exports = {
    ['command']: {
        ['env']: {
            // env map or default process.env.NODE_ENV = value
        }
    }
}

// {
//     'dev': {
//         'test': {
//             'NODE_ENV': 'test',
//             'OTHER_ENV': 'other_value'
//         }
//     }
// }

// {
//     'test': {
//         'NODE_ENV': 'test',
//         'OTHER_ENV': 'other_value'
//     },
//     'pre': {
//         'NODE_EVN': '',
//     }
// }