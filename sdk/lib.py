from datetime import datetime

class GameDate:
    def get_date_format(self, datetime):
        return str(datetime.date())

    def get_date(self, year, month, day):
        return str(datetime(year=year, month=month, day=day).date())

    default = str(datetime.now().date())