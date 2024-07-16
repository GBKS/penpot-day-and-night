
const defaultgroupName = 'Default'
const dayGroupName = 'Day'
const nightGroupName = 'Night'

penpot.ui.open("Day & Night", "", {
    width: 254,
    height: 278,
});

penpot.ui.onMessage((message) => {
    // console.log('plugin got message', message)
    if (message.type === 'state') {
        returnStateMessage()
    } else if(message.type === 'toggle') {
        toggleColors()
        returnStateMessage()
    } else if(message.type === 'create') {
        setupColorPalette()
        returnStateMessage()
    } else if(message.type === 'clear') {
        clearColors()
        returnStateMessage()
    }
});

function returnStateMessage() {
    const groups = getColorGroups()
    const theme = detectTheme()

    let data = { groups, theme }

    // console.log('returnStateMessage', groups, theme)

    penpot.ui.sendMessage({
        type: 'state',
        data
    })
}

function clearColors() {
    const colors = penpot.library.local.colors
    const colorGroups = getColorGroups()

    Object.keys(colorGroups).forEach(groupName => {
        colors.forEach(color => {
            if(color.name == groupName) {
                color.remove()
            }
        })
    });
}

/*

- Loops over colors
- Groups them by name
- Kicks out ones that don't have default, day, and night
- Identifies the mode of each group

Creates an object like this:

{
    "Blue": {
        default: "#FF0000",
        Day: "#FF0000",
        Night: "#0000FF"
        mode: 'Day
    }
}

*/
function getColorGroups() {
    const colors = penpot.library.local.colors
    // console.log('library', penpot.library)
    // console.log('colors', colors)

    // Loop over colors and log names
    
    const colorGroups = {}

    colors.forEach(color => {
        if(!colorGroups[color.name]) {
            colorGroups[color.name] = {}
        }

        const path = color.path == "" ? defaultgroupName : color.path

        colorGroups[color.name][path] = color.color

        // console.log(color.name, color.path)
    })

    Object.entries(colorGroups).forEach(([groupName, group]) => {
        let mode = defaultgroupName

        if(!group[dayGroupName] || !group[nightGroupName]) {
            delete colorGroups[groupName]
        }

        if(group[defaultgroupName] == group[dayGroupName]) {
            mode = dayGroupName
        } else if(group[defaultgroupName] == group[nightGroupName]) {
            mode = nightGroupName
        }

        group.mode = mode
    })

    // console.log('getColorGroups', colorGroups)

    return colorGroups
}

/*

- Sets up a basic color palette
- 10 neutrals
- 13 colors along the spectrum
- Each one with default, day, and night library colors

*/
function setupColorPalette() {
    const colors = [
        {
            name: 'Primary',
            day: '#F7931A',
            night: '#F89B2A'
        },{
            name: 'Pink',
            day: '#EE4162',
            night: '#EE4161'
        },{
            name: 'Red',
            day: '#EB5757',
            night: '#EC6363'
        },{
            name: 'Orange',
            day: '#F7931A',
            night: '#F89B2A'
        },{
            name: 'Yellow',
            day: '#F9CD21',
            night: '#F9CD20'
        },{
            name: 'Green',
            day: '#34C571',
            night: '#36B46B'
        },{
            name: 'Mint',
            day: '#16CAC2',
            night: '#16CAC1'
        },{
            name: 'Teal',
            day: '#08B6DD',
            night: '#08B6DC'
        },{
            name: 'Cyan',
            day: '#2D9CDB',
            night: '#3CA3DE'
        },{
            name: 'Blue',
            day: '#4A6FF5',
            night: '#6877FD'
        },{
            name: 'Indigo',
            day: '#7A60E5',
            night: '#7A60E4'
        },{
            name: 'Purple',
            day: '#B85FDA',
            night: '#C075DC'
        },{
            name: 'Brown',
            day: '#A68151',
            night: '#A68150'
        },{
            name: 'Neutral 0',
            day: '#FFFFFF',
            night: '#000000'
        },{
            name: 'Neutral 1',
            day: '#F8F8F8',
            night: '#1A1A1A'
        },{
            name: 'Neutral 2',
            day: '#F4F4F4',
            night: '#2D2D2D'
        },{
            name: 'Neutral 3',
            day: '#EDEDED',
            night: '#444444'
        },{
            name: 'Neutral 4',
            day: '#DEDEDE',
            night: '#5C5C5C'
        },{
            name: 'Neutral 5',
            day: '#BBBBBB',
            night: '#787878'
        },{
            name: 'Neutral 6',
            day: '#999999',
            night: '#949494'
        },{
            name: 'Neutral 7',
            day: '#777777',
            night: '#B0B0B0'
        },{
            name: 'Neutral 8',
            day: '#404040',
            night: '#CCCCCC'
        },{
            name: 'Neutral 9',
            day: '#000000',
            night: '#FFFFFF'
        }
    ]

    colors.forEach(colorData => {
        const library = penpot.library.local
        const color = library.createColor()
        color.name = colorData.name
        color.color = colorData.day

        const dayColor = library.createColor()
        dayColor.name = colorData.name
        dayColor.color = colorData.day
        dayColor.path = 'Day'

        const nightColor = library.createColor()
        nightColor.name = colorData.name
        nightColor.color = colorData.night
        nightColor.path = 'Night'
    })
}

/*

Identifies the current theme from the first color

*/
function detectTheme() {
    let result

    const colorGroups = getColorGroups()
    const groupNames = Object.keys(colorGroups)
    if(groupNames.length > 0) {
        const groupName = groupNames[0]
        const group = colorGroups[groupName]
        result = group.mode
    }
    
    // console.log('detectTheme', colorGroups, groupNames, result)

    return result
}

function toggleColors() {
    const theme = detectTheme()
    const newTheme = theme == dayGroupName ? nightGroupName : dayGroupName

    // console.log('toggleColors', theme, newTheme)    

    const colors = penpot.library.local.colors
    const colorGroups = getColorGroups()

    // Loop over the colorGroups object
    // If a group has a default, Light and Dark color, set the color to the Dark color
    Object.keys(colorGroups).forEach(groupName => {
        const group = colorGroups[groupName];
        if (group[defaultgroupName] && group[dayGroupName] && group[nightGroupName]) {
            group[defaultgroupName] = group[newTheme];
            // if (group[defaultgroupName] === group[nightGroupName]) {
            //     group[defaultgroupName] = group[dayGroupName];
            // } else {
            //     group[defaultgroupName] = group[nightGroupName];
            // }

            // console.log('group', groupName, group[defaultgroupName])

            colors.forEach(color => {
                if(color.name == groupName && color.path == "") {
                    // console.log('setting it', color.color, groupName, newTheme, group[newTheme])
                    color.color = group[newTheme]
                }
            })
        }
    });

    return newTheme

    // console.log('colorGroups', colorGroups)
}