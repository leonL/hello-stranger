import L from 'leaflet';

const strangerMarker = new L.Icon({
    iconUrl: require('./blue-pupil.png'),
    // shadowUrl: null,
    iconSize: [20, 20],
    // shadowSize: null,
    iconAnchor: [10, 10],
    // shadowAnchor: null,
    popupAnchor: [0, -15],
    className: 'stranger-marker'
});

export default strangerMarker;