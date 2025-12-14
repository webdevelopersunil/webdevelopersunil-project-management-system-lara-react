import Settings from './Settings'
import PortalController from './PortalController'

const Controllers = {
    Settings: Object.assign(Settings, Settings),
    PortalController: Object.assign(PortalController, PortalController),
}

export default Controllers