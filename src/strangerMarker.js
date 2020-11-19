import L from 'leaflet';

const strangerMarker = new L.Icon({
    iconUrl: require('./stranger.png'),
    // shadowUrl: null,
    iconSize: [25, 25],
    // shadowSize: null,
    iconAnchor: [8, 8],
    // shadowAnchor: null,
    popupAnchor: [0, -10],
    className: 'stranger-marker'
});

export default strangerMarker;