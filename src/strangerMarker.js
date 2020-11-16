import L from 'leaflet';

const strangerMarker = new L.Icon({
    iconUrl: require('./strangerIcon.png'),
    // shadowUrl: null,
    iconSize: [20, 20],
    // shadowSize: null,
    iconAnchor: [0, 10],
    // shadowAnchor: null,
    popupAnchor: [10, -10],
    className: 'stranger-marker'
});

export default strangerMarker;