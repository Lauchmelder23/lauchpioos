module Util
{
    export class ShapeStyle
    {
        public strokeWidth: number;
        public strokeColor: string;
        public fillColor: string;

        constructor()
        {
            this.strokeWidth = 1;
            this.strokeColor = '#000000';
            this.fillColor = '#00000000';
        }
    }
}