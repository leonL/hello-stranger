import L from 'leaflet';

const strangerMarker = new L.Icon({
    iconUrl: require('./mapIcon.png'),
    // shadowUrl: null,
    iconSize: [40, 40],
    // shadowSize: null,
    iconAnchor: [20, 40],
    // shadowAnchor: null,
    popupAnchor: [0, -45],
    className: 'stranger-marker'
});

export default strangerMarker;